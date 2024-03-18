import FormImport from '../../components/FormImport';
import FormLogin from '../../components/FormLogin';
import FormNamespace from '../../components/FormNamespace';
import FormRollout from '../../components/FormRollout';
import FormSegment from '../../components/FormSegment';
import SuccessPage from '../../components/ViewSuccess';

import { ApplicationSteps } from '../../constants/enums';
import { useApplicationStore } from '../../store/useApplicationStore';

export default function HomePage() {
  const step = useApplicationStore((s) => s.step);

  switch (step) {
    case ApplicationSteps.LOGIN:
      return <FormLogin />;
    case ApplicationSteps.CHOOSE_NAMESPACE:
      return <FormNamespace />;
    case ApplicationSteps.INPUT_SEGMENT:
      return <FormSegment />;
    case ApplicationSteps.IMPORT_FILE:
      return <FormImport />;
    case ApplicationSteps.CREATE_ROLLOUT:
      return <FormRollout />;
    case ApplicationSteps.SUCCESS:
      return <SuccessPage />;
    default:
      return <FormLogin />;
  }
}
