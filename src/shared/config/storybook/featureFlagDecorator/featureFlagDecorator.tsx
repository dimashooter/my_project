import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagDecorator = (featureFlags: FeatureFlags) => (StoryComponent: Story) => {
  setFeatureFlags(featureFlags)
  return (
    <StoryComponent />
  )
}