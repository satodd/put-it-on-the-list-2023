import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function AddIcon(props: SvgProps) {
    return (
        <Svg
            width="1em"
            height="1em"
            fill="#000"
            viewBox="0 0 500 500"
            {...props}
        >
            <Path d="M250 0C111.9 0 0 111.9 0 250s111.9 250 250 250 250-111.9 250-250S388.1 0 250 0Zm145.161 278.226a12.132 12.132 0 0 1-12.1 12.1h-92.738v92.742a12.132 12.132 0 0 1-12.1 12.1h-56.449a12.132 12.132 0 0 1-12.1-12.1v-92.745h-92.739a12.132 12.132 0 0 1-12.1-12.1v-56.449a12.132 12.132 0 0 1 12.1-12.1h92.742v-92.739a12.132 12.132 0 0 1 12.1-12.1h56.452a12.132 12.132 0 0 1 12.1 12.1v92.742h92.742a12.132 12.132 0 0 1 12.1 12.1Z" />
        </Svg>
    );
}

export default AddIcon;
