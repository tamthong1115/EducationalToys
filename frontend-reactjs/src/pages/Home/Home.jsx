import Banner from "../../components/Banner/Banner"; 
import Hero from "../../components/Hero/Hero";
const Home = () => {
    return (
      <>
        <div className="container mx-auto flex justify-center items-center">
          <Banner/>
        </div>
        <div className="container mx-auto">
          <Hero />
        </div>
        <div className="text-center">

          <h1 className="text-3xl font-bold mb-4">Home Page</h1>
          <p className="text-lg">Welcome to the home page of our application.</p>
          
        </div>
      </>
      
    );
  };
  // cai home nay lat phai xoa a
  export default Home;