// Will need to find a way to store image, will need to test on device for me to adjust
// todo: wire this up to the backend
'use strict';
angular.module('main')
//Function for taking package/item pitcure in posting list.html
// .controller("CamController", function($scope, $cordovaCamera) {
//
//    $scope.takePicture = function() {
//        var options = {
//            quality : 75,
//           //  destinationType : Camera.DestinationType.DATA_URL,
//           //  sourceType : Camera.PictureSourceType.CAMERA,
//            allowEdit : true,
//           //  encodingType: Camera.EncodingType.JPEG,
//           //  targetWidth: 300,
//           //  targetHeight: 300,
//           //  popoverOptions: CameraPopoverOptions,
//            saveToPhotoAlbum: false
//        };
//
//        $cordovaCamera.getPicture(options).then(function(imageData) {
//            $scope.imgURI = "data:image/jpeg;base64," + imageData;
//        }, function() {
//            // An error occured. Show a message to the user
//        });
//    };
//
// });

.controller('CameraCtrl', function ($scope,$cordovaCamera) {
     var upload =function (){

     };

     var getBlob = function(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);
            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        };


     $scope.takePic = function() {

  
         var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 540,
        targetHeight: 540,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log("camera is opend")
        upload(getBlob(imageData, 'image/jpeg')).then(
          function(data) {
           console.log("sucess");
          },
          function(err) {
            console.log(err);
          });
      });
    };
    
   