import {atom,selector} from 'recoil';
import nft1 from '../assets/img/DALL·E 2023-11-14 15.31.49 - A high-quality, detailed character design suitable for an NFT. This character should be intricate and visually striking, with a sophisticated and arti.png'
import nft2 from '../assets/img/image6.png';
import nft3 from '../assets/img/DALL·E 2023-11-15 00.38.31 - A simplistic, cartoonish character suitable for use as an NFT. The character should be unique and have a playful, whimsical design. It should feature .png';
import nft4 from '../assets/img/img5.png';

export type NFTDetails = {
    id: string;
    src: string;
    alt: string;
    artist: string;
    title: string;
    tokenID: string;
    price: string;
    description: string;
  };
  
export const nftDetailsState = atom<NFTDetails[]>({
    key : 'nftDetailsState',
    default: [{
        id: '1',
        src: nft1,
        alt:'image',
        artist: 'Alexei Petrovich',
        title: 'Sonoma #23',
        tokenID: '#26012',
        price: '12.2 xtz',
        description:
          'The image can be described as a masterful blend of organic and mechanical aesthetics, showcasing an advanced level of detail in character design that could be suitable for a high-end NFT. The artist, whom we might fictitiously name "Alexei Petrovich," has ventured into a realm where the mechanical intricacies form an almost sentient portrait, reflecting a deep exploration of the intersection between humanity and machine. Petrovich\'s work seems to ponder the future of identity in a world where technology and flesh become indistinguishable, presenting a character that is both intricate and visually striking, while also being sophisticated and artistic. This character stands as a testament to the potential of algorithmic artistry, where the precision of machine design meets the nuanced contours of human expression.',
      },
      {
        id: '2',
        src: nft2,
        alt:'image',
        artist: 'Elena Vortex',
        title: 'Mystic Visions #8',
        tokenID: '#37421',
        price: '9.5 xtz',
        description:
          'An ethereal journey through dream-like landscapes, "Mystic Visions #8" by Elena Vortex captures the essence of surrealism. The artwork invites viewers into a world of abstract forms and vibrant colors, blending fantasy with a hint of digital futurism. Elena\'s vision brings to life an immersive experience that challenges the boundaries of traditional art forms.',
      },
      {
        id: '3',
        src: nft3,
        alt:'image',
        artist: 'Marco Polaris',
        title: 'Urban Pulse #15',
        tokenID: '#45120',
        price: '11.0 xtz',
        description:
          'Marco Polaris\'s "Urban Pulse #15" is a vivid portrayal of city life, infused with dynamic energy and rich textures. The art piece resonates with the rhythm of urban landscapes, capturing the essence of modern living through a bold palette and intricate details. It reflects a unique perspective on the bustling cityscape, encapsulating both its chaos and beauty.',
      },
      {
        id: '4',
        src: nft4,
        artist: 'Luna Starfield',
        alt:'image',
        title: 'Celestial Dreams #29',
        tokenID: '#52863',
        price: '13.7 xtz',
        description:
          'In "Celestial Dreams #29", Luna Starfield takes us on an interstellar journey, exploring the cosmos through her imaginative lens. The artwork is a mesmerizing fusion of cosmic elements and artistic creativity, capturing the awe-inspiring beauty of the stars and galaxies. Luna\'s work is a tribute to the mysteries of the universe, expressed through vibrant colors and dreamy compositions.',
      },],
}
    
);