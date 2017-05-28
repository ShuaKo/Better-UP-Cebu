function Images(Name, description){
	this.Photo = new Image();
	this.Photo.src = Name;
	this.Description = description;
	this.changePhoto = function(link){
		this.Photo = link;
	}
	this.changeDescription = function(description){
		this.Description = description;
	}
}
function Gallery(){
	this.gallery = [];
	this.size = 0;
	this.addPhoto = function(value, description){
		this.gallery.push(new Images(value, description));
		this.size++;
	}
	this.editPhoto = function(position, value){
		this.gallery[position].changePhoto(value);
	}
	this.editDescription = function(position, value){
		this.gallery[position].changeDescription(value);
	}
	this.deletePhoto = function(position){
		for(var i = position; i < this.size+1; i++){
			var temp = this.gallery[i+1];
			this.gallery[i] = temp;
		}
		this.gallery.pop();
		this.size--;
	}
	this.setMain = function(position){
		var main = this.gallery[position];
		this.deletePhoto(position);
		this.gallery.unshift(main);
		this.size++;
	}
}