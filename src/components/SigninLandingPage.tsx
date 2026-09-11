import { LandingPageFrame, type LandingPageProps } from "./threeui/LandingPageFrame";

export type SigninLandingPageProps = LandingPageProps;

export function SigninLandingPage(props: SigninLandingPageProps) {
  return <LandingPageFrame {...props} title="signin.ai — AI-powered sales support" sourceUrl="/landing-pages/siggma-ai.html" />;
}