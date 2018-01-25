import React from 'react'
import styles from './styles.scss'
import Ionicon from 'react-ionicons'

const Share = props => {
    const imageStyle = {
        backgroundImage: `url('${props.downloadURL}')`,
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}><span className={styles.flower}>꽃</span>이 포장 되었어요!</div>
            <div className={styles.wrapper}>
                <div className={styles.image} style={imageStyle} />
                <div className={styles.share}>
                    <span className={styles.letsShare}>그녀, 그에게 마음을 전해 보세요</span>
                    <div className={styles.shareButtons}>
                        <Ionicon
                            icon='md-download'
                            className={styles.download}
                            color='#635f5c' fontSize={'30px'}
                            onClick={() => props.downloadImage()}
                        />
                        <Ionicon
                            icon='logo-twitter'
                            className={styles.twitter}
                            color='#635f5c' fontSize={'30px'}
                            onClick={() => props.shareOnTwitter(props.downloadURL, 'FitFlowers')}
                        />
                        <Ionicon
                            icon='logo-facebook'
                            className={styles.facebook}
                            color='#635f5c'
                            fontSize={'30px'}
                            onClick={() => {
                                window.FB.ui({
                                    method: 'share',
                                    display: 'popup',
                                    href: props.downloadURL,
                                }, function (response) { });
                            }}
                        />
                        <Ionicon
                            icon='md-text'
                            className={styles.facebook}
                            color='#635f5c'
                            fontSize={'30px'}
                            onClick={() => {
                                window.FB.ui({
                                    method: 'send',
                                    link: props.downloadURL
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share
