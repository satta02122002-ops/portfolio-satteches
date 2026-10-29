export function StampChip({ children }: { children: string }) {
  return (
    <span className="stamp">
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
        <path d="M1.5 5.2 4 7.5 8.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {children}
    </span>
  );
}
