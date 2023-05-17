import {Node, Project, SyntaxKind} from 'ts-morph'

const project = new Project({})

const removedFeatureName = process.argv[2]
const featureState = process.argv[3]  //  on/of

const toggleFunctionName = 'toggleFeatures'
const toggleComponentName = 'toggleComponent'

if(!removedFeatureName){
  throw new Error('add name feature flag')
}

if(!featureState){
  throw new Error('add flag ON / OFF')
}
if(featureState !== 'on' && featureState !== 'off'){
  throw new Error('add on/off value')
}

// project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx')

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')


const files = project.getSourceFiles();


function isToggleFunction(node:Node){
  let isToggle = false;
  node.forEachChild(child => {
    if(child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName){
      isToggle = true
    }
  })
  
  return isToggle
}

function isToggleComponent(node:Node){
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)
  
  return identifier?.getText() === toggleComponentName
}

const replaceToggleFunction = (node:Node) => {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)
  if(!objectOptions) return;
  
  const name  = objectOptions.getProperty('name')
  const on  = objectOptions.getProperty('on')
  const off  = objectOptions.getProperty('off')
  const featureName = name?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1,-1)
  const onFunction = on?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
  const offFunction = off?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)

  if(featureName !== removedFeatureName) return;  


  if(featureState === 'on'){
    node.replaceWithText(onFunction?.getBody().getText() ?? '')
  }
  
   if(featureState === 'off'){
    node.replaceWithText(offFunction?.getBody().getText() ?? '')
  }

files.forEach((sourceFile) => { 
  sourceFile.forEachDescendant((node) => {
    if(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)){
        return replaceToggleFunction(node)
      }

      if(node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)){
         return replaceToggleFunction(node)
      }
      
  })
})

project.save();

