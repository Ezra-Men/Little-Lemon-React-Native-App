import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
  {
    title: 'Appetizers',
    data: [
      { id: '1', title: 'Pasta', price: '10' },
      { id: '3', title: 'Pizza', price: '8' },
    ],
  },
  {
    title: 'Salads',
    data: [
      { id: '2', title: 'Caesar', price: '2' },
      { id: '4', title: 'Greek', price: '3' },
    ],
  },
];

export function getSectionListData(data) {
  const sections = {};
  data.forEach((item) => {
    if (!sections[item.category]) {
      sections[item.category] = [];
    }
    sections[item.category].push(item);
  });
  return Object.keys(sections).map((category) => ({
    title: category,
    data: sections[category],
  }));
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
