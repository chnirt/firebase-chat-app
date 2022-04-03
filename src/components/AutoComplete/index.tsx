import { AutoComplete, Input, Empty } from 'antd'
import { CgSearch } from 'react-icons/cg'

export function MyAutoComplete({
  style = {},
  options = [],
  value = '',
  onSelect = () => {},
  onSearch = () => {},
  onChange = () => {},
  placeholder = 'Search for people',
}) {
  return (
    <div style={style}>
      <AutoComplete
        style={{
          width: '100%',
          backgroundColor: '#efefef',
          borderRadius: '8px',
        }}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        filterOption={(inputValue, option: any) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent={
          <Empty
          // image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        }
        allowClear={true}
        backfill={true}
        // autoFocus={true}
      >
        <Input
          style={{
            borderRadius: '8px',
          }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          prefix={
            <CgSearch
              style={{
                fontSize: 16,
                color: '#767676',
              }}
            />
          }
          bordered={false}
        />
      </AutoComplete>
    </div>
  )
}
