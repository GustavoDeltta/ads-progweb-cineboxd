import React from 'react'
import './TrendingCard.css'
import { FaRegStar } from "react-icons/fa";
import { PiPopcorn } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { TbInfoSquareRounded } from 'react-icons/tb';

export default function TrendingCard(trending) {
    const navigate = useNavigate();
    const styleObject ={
        backgroundImage: `url(${trending.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    const handleDetailsClick = () => {
        navigate(`/details/${trending.type}/${trending.id}`);
    };
    return (
        <div className='trending-card' style={styleObject}>
            <div className='trending-infos'>
                <div className='first-infos'>  
                    <span className='type'> {trending.type} </span>
                    <span className='release-date'>{trending.release}</span>
                </div>
                 <span className='title'>{trending.title}</span>
                <div className='second-infos'>
                    <span className='rating'>
                        <div className='popularity-svg'><FaRegStar /></div>
                        <span>{trending.rating}</span>
                    </span>
                    <span className='popularity'>
                        <div className='popularity-svg'><PiPopcorn /></div>
                        <span>{trending.popularity}</span>
                    </span>
                </div>
                <div className='overview'>
                    <span>{trending.overview || "Resumo indisponível!"}</span>
                </div>
                <button className='button-details' onClick={handleDetailsClick}>
                    <TbInfoSquareRounded className='info-svg'/>
                </button>
            </div>
        </div>
    )
}
