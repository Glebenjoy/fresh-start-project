import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass border-white/10 bg-black/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="font-sans text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Unlock Your Vision
          </DialogTitle>
          <p className="text-[#94A3B8] text-sm mt-2">
            Create an account to unlock the full analysis and keep your dream journal.
          </p>
        </DialogHeader>

        <div className="mt-4">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "hsl(270, 80%, 60%)",
                    brandAccent: "hsl(280, 80%, 50%)",
                    brandButtonText: "hsl(0, 0%, 100%)",
                    defaultButtonBackground: "hsl(0, 0%, 10%)",
                    defaultButtonBackgroundHover: "hsl(0, 0%, 15%)",
                    defaultButtonBorder: "hsl(0, 0%, 20%)",
                    defaultButtonText: "hsl(0, 0%, 90%)",
                    dividerBackground: "hsl(0, 0%, 20%)",
                    inputBackground: "hsl(0, 0%, 5%)",
                    inputBorder: "hsl(0, 0%, 20%)",
                    inputBorderHover: "hsl(270, 80%, 60%)",
                    inputBorderFocus: "hsl(280, 80%, 60%)",
                    inputText: "hsl(0, 0%, 95%)",
                    inputLabelText: "hsl(0, 0%, 70%)",
                    inputPlaceholder: "hsl(0, 0%, 40%)",
                    messageText: "hsl(0, 0%, 95%)",
                    messageTextDanger: "hsl(0, 84%, 60%)",
                    anchorTextColor: "hsl(280, 80%, 65%)",
                    anchorTextHoverColor: "hsl(320, 80%, 65%)",
                  },
                  space: {
                    spaceSmall: "4px",
                    spaceMedium: "8px",
                    spaceLarge: "16px",
                    labelBottomMargin: "8px",
                    anchorBottomMargin: "4px",
                    emailInputSpacing: "4px",
                    socialAuthSpacing: "8px",
                    buttonPadding: "12px 16px",
                    inputPadding: "12px 16px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "9999px",
                    buttonBorderRadius: "9999px",
                    inputBorderRadius: "12px",
                  },
                  fonts: {
                    bodyFontFamily: `'Inter', sans-serif`,
                    buttonFontFamily: `'Inter', sans-serif`,
                    inputFontFamily: `'Inter', sans-serif`,
                    labelFontFamily: `'Inter', sans-serif`,
                  },
                },
              },
              className: {
                container: "auth-container",
                button: "auth-button",
                input: "auth-input",
                message: "text-zinc-900 bg-white/90 p-4 rounded-lg font-medium",
              },
            }}
            providers={["google"]}
            redirectTo={window.location.origin}
            view="sign_in"
            showLinks={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Sign in",
                  social_provider_text: "Continue with {{provider}}",
                  link_text: "Already have an account? Sign in",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Create account",
                  social_provider_text: "Continue with {{provider}}",
                  link_text: "Don't have an account? Sign up",
                },
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
