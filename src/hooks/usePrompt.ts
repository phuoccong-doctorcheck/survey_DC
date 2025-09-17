// useLeavePageConfirm.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLeavePageConfirm = (shouldWarn: boolean, message: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!shouldWarn) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // eslint-disable-next-line no-param-reassign
      e.returnValue = '';
    };

    const handleBrowserBack = (event: PopStateEvent) => {
      const confirm = window.confirm(message);
      if (!confirm) {
        navigate(location.pathname); // giữ lại trang hiện tại
        window.history.pushState(null, '', location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [shouldWarn, message, navigate, location]);
};
