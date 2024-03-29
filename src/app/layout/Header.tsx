import { Avatar } from '@/components/ui';
import useAppState from '@/context';
import { signInWithGoogleFirebase, signOutFirebase } from '@/services/firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const { auth, modal } = useAppState();

  async function login() {
    try {
      modal.openModal();

      const result = await signInWithGoogleFirebase();

      if (result.name === 'FirebaseError') throw new Error(result);

      auth.storeAuthState(result);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      modal.closeModal();
    }
  }

  async function logout() {
    try {
      const confirm = window.confirm('are you sure to logout this session?');

      if (!confirm) return;

      modal.openModal();

      const result = await signOutFirebase();

      if (!result) throw new Error('Fail to Sign Out');

      navigate('/');

      auth.clearAuthState();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      modal.closeModal();
    }
  }

  return (
    <header className="w-full bg-white py-3 px-8">
      <div className="container flex items-center justify-between">
        <Logo />
        {auth.isAuthenticated ? (
          <AvatarLogoutButton
            displayName={auth.userData.displayName}
            logout={logout}
            photoURL={auth.userData.photoURL}
          />
        ) : (
          <LoginWithGoogleButton login={login} />
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link className="flex items-center space-x-2" to="/">
      <img alt="logo" className="h-10 w-10" src="/assets/icons/document.svg" />
      <h1 className="text-2xl">Google Forms Clone</h1>
    </Link>
  );
}

function AvatarLogoutButton({
  logout,
  photoURL,
  displayName,
}: {
  logout: () => void;
  photoURL: string;
  displayName: string;
}) {
  return (
    <button onClick={logout} type="button">
      <Avatar imageUrl={photoURL} name={displayName} />
    </button>
  );
}

function LoginWithGoogleButton({ login }: { login: () => void }) {
  return (
    <button className="bg-white" onClick={login} type="button">
      <img
        alt="Google logo"
        className="align-middle"
        height="35"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
        width="35"
      />
    </button>
  );
}
