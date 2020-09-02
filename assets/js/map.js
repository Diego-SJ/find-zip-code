'use strict';

const mapConfig = {
  center: {
    lat: 20.2981346,
    lng: -98.9947327,
  },
  zoom: 10,
};

const icons = {
  party: {
    icon: 'https://img.icons8.com/doodle/0.9x/marker.png',
  },
  love: {
    icon: 'https://img.icons8.com/cute-clipart/0.9x/love-potion.png',
  },
};

const markersOnMap = [
  {
    LatLng: {
      lat: 20.2981346,
      lng: -98.9947327,
    },
    type: 'party',
    info: {
      title: 'Salon Diana',
      address: 'Caxuxi San Salvador, Hgo. 42640',
      phone: '1234567890',
      email: 'someone@emai.com'
    },
  },
  {
    LatLng: {
      lat: 20.220799,
      lng: -99.242770,
    },
    type: 'love',
    info: {
      title: 'La ceja de la peña',
      address: 'Taxhuada, Mixquiahuala, 42700',
      phone: '8123338888',
      email: 'someone@emai.com'
    },
  },
];

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), mapConfig);

  markersOnMap.map((mark) => {
    const popupTemplate = `
      <h1 class="po-title">${mark.info.title}</h1>
      <p class="po-detail">${mark.info.address}</p>
      <p class="po-detail">${mark.info.email}</p>
      <p class="po-detail">${mark.info.phone}</p>
    `;
    const marker = new google.maps.Marker({
      position: mark.LatLng,
      icon: icons[mark.type].icon,
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({ content: popupTemplate, maxWidth: 300 });

    const toggleBounce = () => {
      infoWindow.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1000);
    };

    marker.addListener('click', toggleBounce);
  });
}

window.onload = function () {
  initMap();
};

// const addMarkerInfo = () => {
//   markersOnMap.forEach(mark => {
//     const marker = new google.maps.Marker({
//       position: mark.LatLng[0],
//       icon: imgUrlParty,
//       map: map,
//     })
//   });
// }
