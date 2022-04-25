const nodes = [
//    {
//      id: 'A',
//      type: 'group',
//      position: { x: 0, y: 0 },
//      style: {
//        width: 170,
//        height: 140,
//      },
//    },
    {
      id: 'A-1',
      data: { label: 'A-1' },
      position: { x: 10, y: 10 },
//      parentNode: 'A',
//      extent: 'parent',
      type: 'system'
    },
    {
      id: 'A-2',
      data: { label: 'A-2' },
      position: { x: 10, y: 90 },
//      parentNode: 'A',
//      extent: 'parent',
    },
    {
      id: 'A-3',
      data: { label: 'A-3' },
      position: { x: 100, y: 10 },
//      parentNode: 'A',
//      extent: 'parent',
      type: 'system'
    },
//  {
//    id: 'B',
//    type: 'output',
//    position: { x: -100, y: 200 },
//    data: null,
//    style: {
//      width: 170,
//      height: 140,
//      backgroundColor: 'rgba(240,240,240,0.25)',
//    },
//  },
    {
      id: 'B-1',
      data: { label: 'B-1' },
      position: { x: -70, y: 30 },
//      parentNode: 'B',
//      extent: 'parent',
//      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'B-2',
      data: { label: 'B-2' },
      position: { x: -140, y: 90 },
//      parentNode: 'B',
//      extent: 'parent',
//      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'B-3',
      data: { label: 'B-3' },
      position: { x: -60, y: 90 },
//      parentNode: 'B',
//      extent: 'parent',
//      draggable: false,
      style: {
        width: 60,
      },
    },
    {
      id: 'C',
      type: 'output',
      position: { x: 100, y: 200 },
      data: { label: 'C' },
    },
  ];
  
  export default nodes;
  