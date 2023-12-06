import { useState, useEffect } from 'react';

const UseWidthSize = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        
        const handleSize =() =>  {
            setWindowWidth(window.innerWidth);
        }

       
        window.addEventListener('resize', handleSize);

        
        return () => {
            window.removeEventListener('resize', handleSize);
        };

    }, []);

    return windowWidth;
}

 export default UseWidthSize;
 