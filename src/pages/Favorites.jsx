import { useContext } from 'react';
import JobItem from '../components/JobItem'
import { favContext } from '../context/FavoritesProvider';

function Favorites() {

const {favItems} = useContext(favContext)  

  return (
    <div className="py-16 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
      {favItems?.length === 0 ? (
        <h1 className='text-2xl font-semibold text-red-500'>Your fav list is empty!</h1>
      ) : (
        favItems?.map((item) => (
          <JobItem
            job={item}
            favItems={favItems}
            key={item.job_id}
          />
        ))
      )}
    </div>
  );
}

export default Favorites