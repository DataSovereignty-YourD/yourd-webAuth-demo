// import Logo from '../../assets/img/deallogo.png';
import Logo from '../../assets/img/logo2.png';
import Logo2 from '../../assets/img/logo3.png';
import Logo3 from '../../assets/img/logo4.png';
export default function DealHero() {
  return (
    <div>
      <img src={Logo} alt="logo" />
      <button>
        <img src={Logo2} alt="logo2" />
      </button>
      {/* <img src={Logo3} alt="logo3" /> */}
    </div>
  );
}
