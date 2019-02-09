import React from 'react';
import './Loading.css';
import PropTypes from 'prop-types'

const Loading = (props) => {
   
   const { width, height } = props

   return <div className="Loading " style={{width, height}} />
};

Loading.defaultProps = {
   width: '40px',
   height: '40px'
}

Loading.propTypes = {
   width: PropTypes.string.isRequired,
   height: PropTypes.string.isRequired
}

export default Loading;