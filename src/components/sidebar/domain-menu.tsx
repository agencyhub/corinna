import { useDomain } from '@/hooks/sidebar/use-domain';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AppDrawer from '../drawer';
import FormGenerator from '../forms/form-generator';
import { Loader } from '../loader';
import { Button } from '../ui/button';
import UploadButton from '../upload-button';

type Props = {
  min?: boolean
  domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}

const DomainMenu = ({ domains, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain()

  return (
    <div className={cn('flex flex-col gap-3', min ? 'mt-6 items-center' : 'mt-3')}>
      <div className={cn('flex items-center', min ? 'justify-center w-full' : 'justify-between w-full')}>
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <AppDrawer
          description="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full border-2 flex items-center justify-center w-8 h-8">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="mydomain.com"
                type="text"
              />
              <UploadButton
                register={register}
                label="Upload Icon"
                errors={errors}
              />
              <Button
                type="submit"
                className="w-full"
              >
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div className={cn('flex flex-col gap-1 text-ironside font-medium', min && 'items-center')}>
        {domains &&
          domains.map((domain) => (
            <Link
              href={`/settings/${domain.name.split('.')[0]}`}
              key={domain.id}
              className={cn(
                'flex gap-3 hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer items-center',
                !min ? 'p-2' : 'py-2 justify-center',
                domain.name.split('.')[0] == isDomain && 'bg-white'
              )}
            >
              <Image
                src={`https://ucarecdn.com/${domain.icon}/-/format/auto/`}
                alt="logo"
                width={20}
                height={20}
              />
              {!min && <p className="text-sm">{domain.name}</p>}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DomainMenu
