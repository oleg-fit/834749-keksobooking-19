// Функция для создания одного JS объектов.
// var creatAdvertisementItem = function () {
//   var advertisementListItem = {};


//   advertisementListItem['author'] = {
//     avatar: 'img/avatars/user0' + 1 + '.png'
//   };

//   advertisementListItem['locationPin'] = {
//     x: randomInteger(minLocationXMap, maxLocationXMap),
//     y: randomInteger(130, 630)
//   };

//   var locationPinX = advertisementListItem.locationPin.x;
//   var locationPinY = advertisementListItem.locationPin.y;

//   advertisementListItem['offer'] = {
//     title: TITLE,
//     address: locationPinX + ', ' + locationPinY,
//     price: randomInteger(0, MAX_PRICE),
//     type: choosingRandomValue(type),
//     rooms: randomInteger(1, MAX_ROOMS),
//     guests: randomInteger(0, MAX_GUESTS),
//     checkin: choosingRandomValue(checkin),
//     checkout: choosingRandomValue(checkout),
//     features: choosingRandomArr(features),
//     description: DESCRIPTION,
//     photos: choosingRandomArr(photos)
//   };

//   return advertisementListItem;
// };


// Функция для создания массива из 8 сгенерированных JS объектов.
// var creatAdvertisement = function () {
//   var advertisementList = [];
//   for (var i = 0; i < MAX_ADVERTISEMENT_QUANTITY; i++) {
//     advertisementList.push(creatAdvertisementItem());
//   }
//   return advertisementList;
// };
