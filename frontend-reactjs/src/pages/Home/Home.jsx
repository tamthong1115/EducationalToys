import Banner from '../../components/Banner/Banner'
import {ListOfCategories} from '../../components/ListOfToy/ListOfCategories.jsx'
import {ListOfToys} from '../../components/ListOfCategorys/ListOfToys.jsx'
import GetAllToys from '../../components/ProductList/GetAllToys.jsx'

const Home = () => {
    return (
        <div className="text-center">
            <Banner/>
            <h1 className="text-3xl font-bold mb-4">Home Page</h1>
            <p className="text-lg">
                Welcome to the home page of our application.
            </p>
            <GetAllToys/>
            <ListOfCategories/>
            <GetAllToys/>
            <ListOfToys/>
        </div>
    )
}
export default Home
