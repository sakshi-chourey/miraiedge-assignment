# Context Architecture Best Practices

## 🎯 **Principles**

### 1. **Scope-Based Providers**
- **Global**: Theme, Auth, Language (needed everywhere)
- **Feature**: Users, Products, Orders (page-specific)
- **Component**: Modal, Form validation (component-specific)

### 2. **Provider Hierarchy**
```
GlobalProviders (Theme, Auth)
├── DashboardProviders (Analytics, Stats)
├── UsersProviders (Users, Permissions)
├── EcommerceProviders (Products, Cart, Orders)
└── AdminProviders (Users + Audit + Permissions)
```

## 📁 **File Structure**
```
contexts/
├── global/
│   ├── ThemeContext.tsx
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── features/
│   ├── UsersContext.tsx
│   ├── ProductsContext.tsx
│   └── OrdersContext.tsx
├── AppProviders.tsx
└── README.md
```

## 🚀 **Usage Examples**

### Simple Page (no extra context)
```tsx
<Route path="about" element={<About />} />
```

### Feature Page (single context)
```tsx
<Route 
  path="users" 
  element={
    <UsersPageProviders>
      <Users />
    </UsersPageProviders>
  } 
/>
```

### Complex Page (multiple contexts)
```tsx
<Route 
  path="admin" 
  element={
    <AdminPageProviders>
      <AdminDashboard />
    </AdminPageProviders>
  } 
/>
```

## 🔄 **Context Communication**

### Option 1: Separate Contexts (Recommended)
```tsx
// Each context handles its own domain
const { users } = useUsers();
const { products } = useProducts();
```

### Option 2: Event Bus for Cross-Context Communication
```tsx
// Use custom events for complex interactions
const { publish } = useEventBus();
publish('user:updated', { userId: 123 });
```

### Option 3: Compound Context (for related data)
```tsx
// For tightly coupled data
const { users, userPermissions } = useUserManagement();
```

## ⚡ **Performance Tips**

1. **Lazy Load Contexts**: Only initialize when needed
2. **Memoize Providers**: Use React.memo for expensive computations
3. **Split State**: Separate read-only and write operations
4. **Selective Subscriptions**: Use selectors to prevent unnecessary re-renders

## 🛡️ **Error Boundaries**

Wrap each provider with error boundaries:
```tsx
export function UsersPageProviders({ children }) {
  return (
    <ErrorBoundary fallback={<UsersErrorFallback />}>
      <UsersProvider>
        {children}
      </UsersProvider>
    </ErrorBoundary>
  );
}
```
