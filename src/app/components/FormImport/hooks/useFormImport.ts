import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { User } from '../../../../lib/flipt/types/entities';
import { constraintsAPI } from '../../../../lib/flipt/endpoints/constraints';
import {
  ComparisonTypesEnum,
  ConstrainOperatorEnum,
} from '../../../../lib/flipt/types/enums';
import { useFormValues } from '../../../store/useFormValues';
import { useApplicationStore } from '../../../store/useApplicationStore';
import { chunkArray, loadFile, parseCSV } from '../utils';

export default function useFormImport() {
  // store states
  const namespace = useFormValues((s) => s.namespace);
  const segment = useFormValues((s) => s.segment);
  const forward = useApplicationStore((s) => s.forward);

  // UI states
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File>();
  const [userList, setUserList] = useState<Array<User>>([]);

  // computed values
  const totalUsers = new Intl.NumberFormat(['id']).format(userList.length);

  // event handlers
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) {
        toast.error('failed to get files from the event');
        return;
      }
      const [loadedFile] = e.target.files;
      setFile(loadedFile);

      const csv = await loadFile(e.target.files);
      const parsed = await parseCSV(csv);

      setUserList(parsed);
      e.target.files = null;
      e.target.value = '';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('unknown error');
    }
  };

  const handleRemoveFile = () => {
    setFile(undefined);
    setUserList([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!namespace) {
        throw new Error('Namespace is required');
      }

      if (!segment) {
        throw new Error('Segment is required');
      }

      const ids = userList.map(({ id }) => parseInt(id, 10));

      const promises = chunkArray(ids, 100).map(
        (chunk, index) => () =>
          constraintsAPI.create(namespace, segment.key, {
            operator: ConstrainOperatorEnum.IS_ONE_OF,
            property: 'user_id',
            type: ComparisonTypesEnum.NUMBER,
            value: JSON.stringify(chunk),
            description: `entries-${index + 1}`,
          })
      );

      toast.info('Please wait while we importing your users');

      for (let index = 0; index < promises.length; index++) {
        await promises[index]();
        setProgress((((index + 1) * 100) / ids.length) * 100);
      }

      toast.success(
        `Successfully imported ${ids.length} users to the ${segment.key} segment`
      );

      forward();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('unhandled error');
    }
  };

  // return values
  return {
    progress,

    file,
    totalUsers,

    handleInputChange,
    handleRemoveFile,
    handleSubmit,
  };
}
