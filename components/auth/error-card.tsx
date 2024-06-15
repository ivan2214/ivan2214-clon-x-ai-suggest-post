import CardWrapper from '@components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorCardProps {}

export const ErrorCard: React.FC<ErrorCardProps> = () => {
  return (
    <CardWrapper
      hederLabel="Oops, algo salio mal"
      backButtonHref="/auth/login"
      backButtonLabel="Volver a iniciar sesion"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};
