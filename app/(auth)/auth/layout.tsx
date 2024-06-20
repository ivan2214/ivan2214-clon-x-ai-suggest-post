const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="container mx-auto flex h-full w-full items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout
