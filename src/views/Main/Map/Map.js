import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import Map, {GoogleApiWrapper, Marker} from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
  _renderMarkers() {
    if (!this.props.places) {
      return;
    }
    return this.props.places.map(p => {
      return <Marker
                key={p.id}
                name={p.id}
                {...p}
                label={p.name}
                onClick={this.props.onClick.bind(this)}
                map={this.props.map}
                position={p.geometry.location} />
    });
  }

  _renderChildren() {
    const {children} = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })
    } else {
      return this._renderMarkers();
    }
  }

  render() {
    const {children} = this.props;

    return (
      <Map map={this.props.map}
        google={this.props.google}
        className={styles.map}
        zoom={this.props.zoom}
        onRecenter={this.props.onMove}
        onDragend={this.props.onMove}
        onClick={this.props.onClick}
        visible={!children || React.Children.count(children) == 0}
        >
        {this._renderChildren()}
      </Map>
    )
  }
}

MapComponent.propTypes = {
  onClick: T.func
}
const identity = (...a) => a;
MapComponent.defaultProps = {
  onClick: identity
}

export default MapComponent