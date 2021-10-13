import React from 'react'
import cx from 'classnames'
import { ItemsBonusType } from '../data/items.type'
import FireIcon from './Icons/Fire'
import WaterIcon from './Icons/Water'
import MountainIcon from './Icons/Mountain'

type Props = {
  bonusType: ItemsBonusType
  className?: string
}

const BonusIcon: React.FC<Props> = ({ bonusType, className }) => (
  <div className={cx(className)}>
    {bonusType === ItemsBonusType.FIRE && <FireIcon className="w-5 h-5 mx-1" />}
    {bonusType === ItemsBonusType.SWIMMING && (
      <WaterIcon className="w-5 h-5 mx-1" />
    )}
    {bonusType === ItemsBonusType.CLIMBING && (
      <MountainIcon className="w-5 h-5 mx-1" />
    )}
  </div>
)

BonusIcon.defaultProps = {
  className: '',
}

export default BonusIcon
