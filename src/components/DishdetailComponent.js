import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText,CardTitle,CardBody } from 'reactstrap';

    

    function RenderDish({dish})
    {
        if(dish!=null)
        {
            return(
                <div className='col-12 col-md-5 m-1'>
                        <Card>
                            
                            
                            <CardImg width = "100%" src = {dish.image} alt={dish.name}/>
                            
                            
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>

                            
                        </Card>
                </div>        
                );
        }
        else 
            return (
                <div></div>
            );
    }   
    function RenderComments({comments})
    {
        if(comments==null)
        {
            return (<div></div>);
        }   
         const commentsArr = comments.map(cmt => {
                return (
                    <li key={cmt.id}>
                        <p>{cmt.comment}</p>
                        <p>-- {cmt.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(cmt.date))}
                        </p>
                    </li>
                );
            });
            
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {commentsArr}
                </ul>

            </div>
        );
            

    }
         
        
        
     
    const DishDetail = (props)=>{
        console.log('Dishdetail render invoked');
        //const dish = this.props.dish;
        if (props.dish == null) {
            return (<div></div>)
        }
      
        return(
            <div className="container">
                <div className='row'>
                    <RenderDish dish ={props.dish}/>
                    <RenderComments comments ={props.dish.comments}/>
                </div>
            </div>
            
        );
    }


export default DishDetail;