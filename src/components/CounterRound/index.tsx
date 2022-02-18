import React, { CSSProperties } from 'react';

type Props = {
  readonly count: number;
  readonly percent: number;
}
const RoundCounter: React.FC<Props> = ({ count, percent }) => {
  const myStyles: CSSProperties = {
    ['--deg' as string]: percent,
  };
  return (
    <>
      {percent !== 0 && (
        <div className="characters">
          <div className={count >= 0 ? 'circle-wrap' : 'circle-red circle-wrap'} style={myStyles}>
            <div className="circle">
              <div className="mask full">
                <div className="fill"> </div>
              </div>
              <div className="mask half">
                <div className="fill"> </div>
              </div>
              <div className="inside-circle">
                {count < 10 && (
                  <span className={count >= 0 ? 'text-orange' : 'text-red'}>
                    {count}
                    {' '}
                  </span>
                ) }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RoundCounter;
