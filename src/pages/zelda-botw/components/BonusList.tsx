import React from 'react'
import { ItemsBonusType } from '../data/items.type'
import BonusBox from './BonusBox'

type Props = {
  fire: number
  swimming: number
  climbing: number
}

const BonusList: React.FC<Props> = ({ fire, swimming, climbing }) => (
  <>
    {fire > 0 && <BonusBox bonusType={ItemsBonusType.FIRE} value={fire} />}
    {climbing > 0 && (
      <BonusBox bonusType={ItemsBonusType.CLIMBING} value={climbing} />
    )}
    {swimming > 0 && (
      <BonusBox bonusType={ItemsBonusType.SWIMMING} value={swimming} />
    )}
  </>
)

export default BonusList
