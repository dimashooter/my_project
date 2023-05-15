import { FeatureFlags } from "@/shared/types/featureFlags";

let featureFlags: FeatureFlags = {}


export const setFeatureFlags = (newFlag?:FeatureFlags) => { 
  if(newFlag){
    featureFlags = newFlag
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags){
  return featureFlags?.[flag] 
}