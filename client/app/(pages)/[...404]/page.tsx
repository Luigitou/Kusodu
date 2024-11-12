export default function NotFound() {
  return (
    <div className={'flex h-full flex-col items-center justify-center gap-12'}>
      <table className={'border-separate border-spacing-4'}>
        <tbody>
          <tr>
            <Cell></Cell>
            <Cell></Cell>
            <Cell></Cell>
          </tr>
          <tr>
            <Cell>4</Cell>
            <Cell>0</Cell>
            <Cell>4</Cell>
          </tr>
          <tr>
            <Cell></Cell>
            <Cell></Cell>
            <Cell></Cell>
          </tr>
        </tbody>
      </table>
      <span className={'text-center text-xl'}>
        Oups, il semblerait que vous cherchiez quelque chose qui n&apos;existe
        pas.
      </span>
    </div>
  );
}

const Cell = ({ children }: { children?: React.ReactNode }) => {
  return (
    <td className={'h-12 w-12 bg-light text-center text-3xl md:h-24 md:w-24'}>
      {children}
    </td>
  );
};
