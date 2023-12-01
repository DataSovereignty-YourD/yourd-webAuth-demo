import {atom,selector} from 'recoil';
import d1 from '../assets/img/d1.png';
import d2 from '../assets/img/d2.png';
import d3 from '../assets/img/d3.png';
import d4 from '../assets/img/d4.png';
import d5 from '../assets/img/d5.png';
import d6 from '../assets/img/d6.png';
import d7 from '../assets/img/d7.png';
import d8 from '../assets/img/d8.png';
import d9 from '../assets/img/d9.png';
import d10 from '../assets/img/d10.png';
import d11 from '../assets/img/d11.png';
import d12 from '../assets/img/d12.png';
import Hot from '../assets/img/cdeal.png';

export type ProductDetails = {
 id:string,
 src:string,
 alt:string,
 title:string,
 rate:string,
 nowPrice:string,
 listPrice:string,
 isFavorited: boolean,
};

const initialProducts: ProductDetails[] = [
    { id: '1', src: d1, alt: 'd1', title: 'Example1',rate:'-43%', nowPrice: '199.99',listPrice:'349.99', isFavorited: false  },
    { id: '2', src: d2, alt: 'd2', title: 'Exampl2', rate:'-11%',  nowPrice: '1,699.99',listPrice:'1,899.99', isFavorited: false  },
    { id: '3', src: d3, alt: 'd3', title: 'Example3',rate:'-29%',  nowPrice: '499.00',listPrice:'699.99', isFavorited: false  },
    { id: '4', src: d4, alt: 'd4', title: 'Example4',rate:'-18%',  nowPrice: '999.99',listPrice:'1,219.99', isFavorited: false  },
    { id: '5', src: d5, alt: 'd5', title: 'Example5',rate:'-7%',  nowPrice: '649.00',listPrice:'699.99', isFavorited: false  },
    { id: '6', src: d6, alt: 'd6', title: 'Example6',rate:'-20%',  nowPrice: '127.98',listPrice:'159.99', isFavorited: false  },
    { id: '7', src: d7, alt: 'd7', title: 'Example7',rate:'-62%',  nowPrice: '229.99',listPrice:'599.99', isFavorited: false  },
    { id: '8', src: d8, alt: 'd8', title: 'Example8', rate:'-42%', nowPrice: '199.99',listPrice:'349.99', isFavorited: false  },
    { id: '9', src: d9, alt: 'd9', title: 'Example9',rate:'-28%',  nowPrice: '84.99',listPrice:'119.00', isFavorited: false  },
    { id: '10', src: d10, alt: 'd10', title: 'Example10',rate:'-38%',  nowPrice: '399.99',listPrice:'649.99', isFavorited: false  },
    { id: '11', src: d11, alt: 'd11', title: 'Example11',rate:'-17%',  nowPrice: '239.99',listPrice:'289.99', isFavorited: false  },
    { id: '12', src: d12, alt: 'd12', title: 'Example12', rate:'-21%', nowPrice: '74.99',listPrice:'94.99', isFavorited: false  },
  ];

  export const productsState = atom<ProductDetails[]>({
    key: 'productsState',
    default: initialProducts,
  });
  
  