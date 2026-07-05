import { useOnboardingContext } from "@/components/editor/onboarding/OnboardingProvider";

export function useOnboarding() {
  return useOnboardingContext();
}
