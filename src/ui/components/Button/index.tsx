import {Spinner} from 'ui/components';
import './button.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean;
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const {active, type, label, isLoading, onClick} = props;

  return (
    <div className="custonButton">
      <button
        type={type ? type : 'button'}
        onClick={onClick}
        className={active ? 'active' : 'disabled'}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <span className={active ? 'active' : 'disabled'}>{label}</span>
        )}
      </button>
    </div>
  );
}
