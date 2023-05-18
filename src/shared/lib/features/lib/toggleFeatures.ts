import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from "./setGetFeatures";

interface ToggleFeaturesProps<T> {
  name: keyof FeatureFlags
  on: () => T
  off: () => T
}

export function toggleFeatures<T>({name,on,off}:ToggleFeaturesProps<T>){

  if(getFeatureFlag(name)){
    return on()
  }
  return off()
}