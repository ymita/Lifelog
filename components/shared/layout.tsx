type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <div>header</div>
      <main>
        <main>{children}</main>
      </main>
      <div>footer</div>
    </div>
  );
}
