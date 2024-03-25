import bannerImage from "../../assets/bannerThumbnail.jpg";

function Home() {
  return (
    <div>
     <h1>Bk Books Store</h1>
     <p>Welcome to BK Books Store, your one-stop destination for all your reading needs!</p>
     <div className="banner-container">
      <img
        className="banner-image"
        src={bannerImage}
        alt="Banner"
      />
    </div>
     
    </div>
  )
}

export default Home;