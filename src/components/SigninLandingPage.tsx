import { LandingPageFrame, type LandingPageProps } from "./threeui/LandingPageFrame";

export type SigninLandingPageProps = LandingPageProps;

const FRAME_URL = `${import.meta.env.BASE_URL}landing-pages/siggma-ai.html`;

export function SigninLandingPage(props: SigninLandingPageProps) {
  return <LandingPageFrame {...props} title="signin.ai — AI-powered sales support" sourceUrl={FRAME_URL} />;
}