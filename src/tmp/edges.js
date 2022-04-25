export default [
    { id: 'a1-a2', source: 'A-1', target: 'A-2', sourceHandle: 'r1', markerEnd: { type: 'arrowclosed', color: '#0000FF'}},
    { id: 'a2-c', source: 'A-2', target: 'C' , style: { stroke: 'red', strokeWidth:2 }, label: 'custom label', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 }},
    //{ id: 'a2-c-2', source: 'A-2', target: 'C' , style: { stroke: 'red', strokeWidth:2 }, label: 'custom label 2', labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 }},
    { id: 'b1-b2', source: 'B-1', target: 'B-2' },
    { id: 'b1-b3', source: 'B-1', target: 'B-3' },
    { id: 'a1-b1', source: 'A-1', target: 'B-1', sourceHandle: 'a1' },
    { id: 'a1-a3', source: 'A-1', target: 'A-3', sourceHandle: 'r1', targetHandle: 'l1' }
  ];
  