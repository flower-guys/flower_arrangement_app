import React, { Component } from 'react'
import styles from './styles.scss'
import Ionicon from 'react-ionicons'

class Share extends Component {
    componentDidMount() {
        // Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '492504484484057',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    downloadImage = () => {
        this.props.exportDataURL()
        // PROMISE 공부해서 코드 바꿀 것! PROMISE~!
        setTimeout(() => {
            const link = document.createElement("a")
            link.download = 'fit-flowers'
            link.href = this.props.canvasDataURL
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }, 100);
    }
    render() {
        return (
            <div className={styles.shareButtons}> 
                <Ionicon 
                    icon='md-download'
                    className={styles.download}
                    color='#635f5c'fontSize={30}
                    onClick={() => this.downloadImage()} 
                />
                <Ionicon
                    icon='logo-instagram'
                    className={styles.instagram}
                    color='#635f5c' fontSize={30}
                />
                <Ionicon 
                    icon='logo-facebook'
                    className={styles.facebook}
                    color='#635f5c'
                    fontSize={30}
                    onClick={()=> {
                        window.FB.ui({
                            method: 'share',
                            display: 'popup',
                            href: this.props.canvasDataURL,
                        }, function (response) { });
                    }}
                />
                <Ionicon
                    icon='md-mail-open'
                    className={styles.mail}
                    color='#635f5c'
                    fontSize={30}
                />
            </div>
        )
    }
}

export default Share