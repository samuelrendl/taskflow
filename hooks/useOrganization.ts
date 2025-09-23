import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMe } from './useMe';
import { setOrganization } from '@/lib/store/organizationSlice';
import { fetchOrganization } from '@/lib/api';

export const useOrganization = () => {
  const dispatch = useDispatch();
  const { me } = useMe();

  useEffect(() => {
    const loadOrganization = async () => {
      if (me?.organization?.id) {
        try {
          const organization = await fetchOrganization(me.organization.id);
          dispatch(setOrganization(organization));
        } catch (error) {
          console.error('Failed to fetch organization:', error);
        }
      }
    };

    loadOrganization();
  }, [me?.organization?.id, dispatch]);
};