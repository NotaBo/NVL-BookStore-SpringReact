<TableCell>
                <img src={`http://localhost:8080/api/file/image/${basket.imageUrl}`}  alt=""/>
                </TableCell>
                <TableCell>
                <div className="details">
                    <h1 className='name'>{basket.name}</h1>
                    <LoadingButton
                      color='error'
                      onClick={()=>store.dispatch(removeBasketItemThunk({productId:basket.productId, quantity:1}))}
                    >
                        -   
                    </LoadingButton>
                      {basket.quantity}
                    <LoadingButton
                      color='success'
                      onClick={()=> store.dispatch(addBasketItemThunk({productId:basket.productId}))}
                    >
                        +
                    </LoadingButton>
                    <p>{basket.category?.substring(0,100)}</p>
                    <div className="price">{basket.quantity} x ${basket.unitPrice}</div>
                </div>
                </TableCell>
                <TableCell align='right'>
                <LoadingButton 
                      loading={status === 'pendingremoveItem' + basket.productId} 
                      className="delete"
                      onClick={() => store.dispatch(removeBasketItemThunk({productId:basket.productId,quantity:basket.quantity}))}>
                  <DeleteOutlinedIcon />
                  </LoadingButton>
                </TableCell>