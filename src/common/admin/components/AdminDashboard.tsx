import { IImageProps, ImageFit, Image, mergeStyles, AnimationClassNames } from '@fluentui/react';
import * as React from 'react'
import AppContext from '../../config/app-context.config';
import { FormExample } from '../../examples';
import GridConsumer from '../../examples/grid/GridConsumer';

export const AdminDashboard: React.FunctionComponent<{}> = (props) => {
    
    const image: any = require('./../../assets/frontend.svg');

    const imageProps: IImageProps = {
        imageFit: ImageFit.contain,
        src: image 
    };
 
    const dashboardImageClasss = mergeStyles([
        { 
            display: 'flex',
            alignItems : 'center',
            justifyContent: 'center',
        },
        AnimationClassNames.fadeIn100,
    ]);  


    return (
        <>
            <div className='content' style={{ maxWidth: '100%' }}> 
                <GridConsumer/>
                {/* <FormExample /> */}
                {/* <div className={dashboardImageClasss}>
                    <Image
                        {...imageProps} 
                        width='60%'
                        height='60%'
                    /> 
                </div> */}
            </div>
        </>
    );
}