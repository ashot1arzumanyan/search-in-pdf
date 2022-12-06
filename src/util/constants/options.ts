import { Option } from '../../types/types';

const getOptions = (amount: number) => {
  const options = [] as Option[];
  for (let i = 1; i <= amount; i += 1) {
    const option = {
      id: `field_${i}`,
      name: `Field ${i}`,
      value: '',
    };

    options.push(option);
  }

  return options;
};

export default getOptions(3);
