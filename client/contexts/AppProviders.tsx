import { ThemeProvider } from './ThemeContext';
import { UsersProvider } from './UsersContext';

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

export function UsersPageProviders({ children }: { children: React.ReactNode }) {
  return (
    <UsersProvider>
      {children}
    </UsersProvider>
  );
}

export function ProductsPageProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export function DashboardPageProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export function AdminPageProviders({ children }: { children: React.ReactNode }) {
  return (
    <UsersProvider>
      {children}
    </UsersProvider>
  );
}
