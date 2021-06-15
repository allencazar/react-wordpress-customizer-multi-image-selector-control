import React, {useEffect, useState} from 'react';
import {SortableContainer, SortableElement, SortableHandle, } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Icons from './components/icons';

const DragHandle = SortableHandle(({children}) => <div className="drag-handle">{children}</div>);

const SortableItem = SortableElement(({value, sortIndex, removeItem, className}) => (
   <div className={className} >
      <div className="close-button" onClick={removeItem}>
         <Icons icon="close" color="#0A0A0A" size={12}/>
      </div>
      <DragHandle>
         <img src={value.url} id={value.id} className="wp-drag-sort-multi-image-upload-control-thumbnails" />
      </DragHandle>
   </div>
));

const SortableList = SortableContainer(({items, removeItem}) => {
  return (
    <div className="wp-drag-sort-multi-image-upload-control-sort-container">
      {items.map((item, index) => (
         <SortableItem 
            key={`item-${item.id}`} 
            index={index} 
            value={item} 
            sortIndex={index}
            removeItem={()=>removeItem(item.id)}
            className="wp-drag-sort-multi-image-upload-control-sortable-item"
         />
      ))}
    </div>
  );
});

const App = (props) => {
   
   const [imageSelection, setImageSelection] = useState([]);
   const [images, setImages] = useState([]);

   useEffect(async ()=>{
      console.log("props", props);

      if(props.selected_ids){
         setImages(props.selected_ids);
         setImageSelection(props.selected_ids.map(image => {
            return wp.media.attachment(image.id);
         }));
      }

      // if(props.selected_ids){
      //    const preloadedIDs =  props.selected_ids.split(',');
      //    let _images = [];
      //    let preloadedSelection = (preloadedIDs.map( id => {
      //          let attachment = wp.media.attachment(id);
      //          return attachment;
      //       })
      //    );
      //    setImageSelection(preloadedSelection);
         
      //    for(let attachment of preloadedSelection){
      //       _images = [..._images, await attachment.fetch().then(r=> ({id: r.id, url: r.url}))];
      //    }
      //    setImages(_images);
      // }
   }, [props]);

   useEffect(()=>{
      if(images){
         let input = document.getElementById(`_customize-input-${props.setting}`);
         let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
         
         // nativeInputValueSetter.call(input, images.map(image=>image.id).join());
         nativeInputValueSetter.call(input, JSON.stringify(images));

         let ev2 = new Event('input', { bubbles: true});
         input.dispatchEvent(ev2);
      }
   },[images]);

   function openWPMedia(){
      let custom_uploader = wp.media.frames.file_frame = wp.media({
         multiple: 'add',
         library : { type : 'image'},
      });

      custom_uploader.on('select', function() {
         let selection = custom_uploader.state().get('selection');
         setImageSelection(selection.map( v=> v));
         setImages(selection.map( v=> {
               let value = v.toJSON();
               return {id:value.id, url:value.url};
            })
         );
      });

      custom_uploader.on('open', () => {
         let library = custom_uploader.state().get('selection');
         library.add(imageSelection);
      });

      custom_uploader.open();
   }

   function handleAdd(){
      openWPMedia();
   };

   const onSortEnd = ({oldIndex, newIndex}) => {
      setImages(arrayMove(images, oldIndex, newIndex));
   };

   const removeItem = (id) => {
      setImages(
         images.filter( (item, index) => {
            return id !== item.id
         })
      )
      setImageSelection(
         imageSelection.filter( (item, index) => {
            return id !== item.id
         })
      )
   }

   return (
      <React.Fragment>
         <SortableList 
            items={images} 
            onSortEnd={onSortEnd} 
            axis="xy"
            shouldUseDragHandle={true}
            useDragHandle
            removeItem={removeItem}
            helperClass="dragging-helper-class"
         />
          <div className='actions'>
            <button type="button" class="button remove-button" type="button" onClick={() => handleAdd()} >Edit Collection</button>
          </div>
      </React.Fragment>
   )
}

export default App;