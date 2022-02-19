// npm
import numeral from 'numeral';

export default {
  name: 'NumbersMixin',
  computed: {
    mx$getAmount() {
      return (value) => {
        if (!value) return '';
        if (Number(value)) {
          return numeral(value).format('0,0');
        }
        return null;
      };
    },
  },
};
