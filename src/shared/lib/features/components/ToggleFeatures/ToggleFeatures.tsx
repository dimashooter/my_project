import React from 'react'
import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from '../../lib/setGetFeatures';


interface ToggleFeaturesProps {
  name: keyof FeatureFlags
  on: React.ReactElement
  off: React.ReactElement
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { name, on: On, off: Off } = props
  if (getFeatureFlag(name)) {
    return On
  }
  return Off
}

