import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://security.dvmalkin.ru/auth',
    realm: 'nzfk/',
    clientId: 'front',
});

export default keycloak;
